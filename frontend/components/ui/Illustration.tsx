import Image from "next/image";

export default function Illustration() {
  return (
    <div className="flex justify-center mt-8">
      <Image
        src="/propertylogin_image.jpg"
        alt="Property Login Illustration"
        width={800}
        height={450}
        className="rounded-lg object-contain"
        priority
      />
    </div>
  );
}
