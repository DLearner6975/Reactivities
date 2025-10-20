import { Grid } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

export default function ProfilePage() {
    const { id } = useParams();
    const { profile, loadingProfile } = useProfile(id);

    if (loadingProfile) return <div>Loading profile...</div>;

    if (!profile) return <div>Profile not found</div>;

    return (
        <Grid container>
            <Grid size={12}>
                <ProfileHeader />
                <ProfileContent />
            </Grid>
        </Grid>
    );
}
