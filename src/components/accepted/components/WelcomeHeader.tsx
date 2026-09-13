interface WelcomeHeaderProps {
  displayName: string;
}

export default function WelcomeHeader({ displayName }: WelcomeHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {displayName}!
          </h1>
          <p className="text-gray-500 mt-1">Here is your policy overview.</p>
        </div>
      </div>
    </div>
  );
}
