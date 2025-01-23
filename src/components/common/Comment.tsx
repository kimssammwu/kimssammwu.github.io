import React, { useEffect, useRef, useState } from "react";

type CommentStatus = "pending" | "success" | "failed";

const Comment = ({ theme = "" }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const savedThemeIsDarkMode = localStorage.getItem("isDarkMode");
      return savedThemeIsDarkMode === "true";
    }
    return false;
  });

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail);
    };

    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  const commentsLightRef = useRef<HTMLDivElement | null>(null);
  const commentsDarkRef = useRef<HTMLDivElement | null>(null);

  const attributes = (themeName: string) => ({
    src: "https://utteranc.es/client.js",
    repo: "kimssammwu/personal-blog-comment",
    "issue-term": "pathname",
    label: "💬 blog comment",
    theme: themeName,
    crossorigin: "anonymous",
  });

  const loadScript = (
    ref: React.RefObject<HTMLDivElement>,
    themeName: string
  ) => {
    if (!ref.current) return;

    const utterancesElement = document.createElement("script");
    Object.entries(attributes(themeName)).forEach(([key, value]) => {
      utterancesElement.setAttribute(key, value);
    });
    utterancesElement.async = true;

    ref.current.appendChild(utterancesElement);
  };

  useEffect(() => {
    if (commentsLightRef.current) loadScript(commentsLightRef, "github-light");
    if (commentsDarkRef.current) loadScript(commentsDarkRef, "photon-dark");
  }, []);

  return (
    <div className="comments-wrapper mt-12">
      {/* 라이트 모드 */}
      <div
        ref={commentsLightRef}
        style={{ display: isDarkMode ? "none" : "block" }}
      />
      {/* 다크 모드 */}
      <div
        ref={commentsDarkRef}
        style={{ display: isDarkMode ? "block" : "none" }}
      />
    </div>
  );
};

export default Comment;
