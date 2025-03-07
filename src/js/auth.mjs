// export async function login(creds, redirect) {
//   const response = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(creds),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     localStorage.setItem("authToken", data.token);
//     window.location.href = redirect || "/dashboard";
//   } else {
//     console.error("Login failed");
//   }
// }

// export function checkLogin() {
//   const token = localStorage.getItem("authToken");

//   if (!token || !isTokenValid(token)) {
//     const currentPage = window.location.pathname;
//     window.location.href = `/login?redirect=${encodeURIComponent(currentPage)}`;
//   }
// }

// export function isTokenValid() {
//   const token = localStorage.getItem("authToken");
//   if (!token) return false;

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000 > Date.now();
//   } catch (error) {
//     return false;
//   }
// }
