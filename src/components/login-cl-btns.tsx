import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { useState } from "react";

export default function LoginButtons (){
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  return (
    <>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("google")}
      >
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          // <Googl className="mr-2 h-4 w-4" />
          <></>
        )}{" "}
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("github")}
      >
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </>
  );
}