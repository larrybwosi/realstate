import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";

import SigninForm from "@/components/signup-form-demo";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Cheap City.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[480px]">
            <SigninForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="https://cdn.sanity.io/images/k1f8kx4i/production/b545fee9240131b6d4236daa5231a258afd0280a-736x1104.png?fm=webp"
          alt="Image"
          width={1280}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] "
        />
      </div>
    </div>
  );
}
