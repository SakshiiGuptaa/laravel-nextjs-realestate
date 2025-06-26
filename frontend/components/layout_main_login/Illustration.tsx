import Image from "next/image";

export default function Illustration() {
  return (
    <div className="flex justify-center mt-6 sm:mt-8">
      <Image
        src="/propertylogin_image.jpg"
        alt="Property Login Illustration"
        width={700}
        height={400}
        className="rounded-2xl object-contain shadow-2xl border-4 border-white/40 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl"
        priority
      />
    </div>
  );
}
