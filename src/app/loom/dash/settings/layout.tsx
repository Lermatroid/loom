import SettingsSideItem from "./SettingsSideItem";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mt-20 w-full">
			<div className="pb-20 flex items-start w-full">
				<h1 className="font-semibold text-4xl font-general-sans">Settings</h1>
			</div>
			<div className="w-full grid grid-cols-[250px_1fr] gap-x-4 min-h-[60vh]">
				<div className="grid grid-cols-1 gap-y-1 h-min">
					<SettingsSideItem path="/">Settings</SettingsSideItem>
					<SettingsSideItem path="/account">Account</SettingsSideItem>
					<SettingsSideItem path="/users">Users</SettingsSideItem>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}
