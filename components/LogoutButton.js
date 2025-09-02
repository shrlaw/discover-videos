// components/LogoutButton.js
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY);

      // 🔥 Clear Magic session in the browser
      await magic.user.logout();

      // 🔥 Call backend to clear cookie + invalidate Magic session
      await fetch("/api/logout", {
        method: "POST",
      });

      // 🔥 Redirect back to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "red",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
