import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agents from "../api/agents";
import { useMemo } from "react";

export const useProfile = (id?: string) => {
    const queryClient = useQueryClient();

    const { data: profile, isLoading: loadingProfile } = useQuery({
        queryKey: ["profile", id],
        queryFn: async () => {
            const response = await agents.get<Profile>(`/profiles/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    const { data: photos, isLoading: loadingPhotos } = useQuery({
        queryKey: ["photos", id],
        queryFn: async () => {
            const response = await agents.get<Photo[]>(
                `/profiles/${id}/photos`
            );
            return response.data;
        },
        enabled: !!id,
    });

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await agents.post<Photo>(
                `/profiles/add-photo`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return response.data;
        },
        onSuccess: async (photo) => {
            await queryClient.invalidateQueries({ queryKey: ["photos", id] });
            await queryClient.setQueryData(["user"], (data: User) => {
                if (!data) return data;
                return { ...data, imageUrl: data.imageUrl ?? photo.url };
            });

            await queryClient.setQueryData(["profile", id], (data: Profile) => {
                if (!data) return data;
                return { ...data, imageUrl: data.imageUrl ?? photo.url };
            });
        },
    });

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agents.put(`/profiles/${photo.id}/setMain`);
        },

        onSuccess: (_, photo) => {
            queryClient.setQueryData(["user"], (userData: User) => {
                if (!userData) return userData;
                return { ...userData, imageUrl: photo.url };
            });
            queryClient.setQueryData(["profile", id], (profile: Profile) => {
                if (!profile) return profile;
                return { ...profile, imageUrl: photo.url };
            });
        },
    });

    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agents.delete(`/profiles/${photoId}/photos`);
        },
        onSuccess: (_, photoId) => {
            queryClient.setQueryData(["photos", id], (photos: Photo[]) => {
                if (!photos) return photos;
                return photos?.filter((x) => x.id !== photoId);
            });
        },
    });

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(["user"])?.id;
    }, [id, queryClient]);

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
    };
};
