import { toast } from "sonner";
import { useState, useEffect } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

import { createViewerToken } from "@/actions/token";

export function useViewerToken(hostIdentity: string) {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    async function createToken() {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string };

        const name = decodedToken?.name;
        if (name) {
          setName(name);
        }

        // ! const identity = decodedToken.jti;
        const identity = decodedToken.sub;
        if (identity) {
          setIdentity(identity);
        }
      } catch {
        toast.error("Something went wrong");
      }
    }

    createToken();
  }, [hostIdentity]);

  return { name, token, identity };
}
