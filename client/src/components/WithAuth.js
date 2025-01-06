// components/withAuth.js
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/admin/login"); // Redirect to login if not authenticated
      }
    }, [isLoggedIn, router]);

    // Render nothing while checking authentication status
    if (!isLoggedIn) {
      return null;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
