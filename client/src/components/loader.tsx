import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loader({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen backdrop-blur-sm bg-black/40">
      <div className="bg-gray-900 rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center justify-center space-y-4">
        <DotLottieReact
          src="https://lottie.host/0cead3f0-4c3d-4343-b948-03fb23fa08b9/AKtNjox0Bm.lottie"
          loop
          autoplay
          style={{ width: '220px', height: '220px' }}
        />
        <p className="text-gray-100 text-lg font-semibold text-center">
          Generating script, please wait...
        </p>
        <p className="text-sm text-gray-400 text-center">
          Processing... this could take a little over a minute
        </p>
      </div>
    </div>
  );
}
