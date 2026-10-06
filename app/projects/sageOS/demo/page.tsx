import SageOSDemoPage from "../../portfolio-cms/demo/page";

const videoUrl =
	"https://res.cloudinary.com/virfpzu4/video/upload/v1791273852/login_1_njncqx.mp4";
const secondaryVideoUrl =
	"https://res.cloudinary.com/virfpzu4/video/upload/v1791273868/file_manager_2_uk6f7n.mp4";

export default function Page() {
	return (
		<SageOSDemoPage videoUrl={videoUrl} secondaryVideoUrl={secondaryVideoUrl} />
	);
}
