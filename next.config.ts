import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/resume/:file*",
        headers: [
          { key: "Content-Disposition", value: 'attachment; filename="resume.pdf"' },
          { key: "Content-Type", value: "application/pdf" },
        ],
      },
    ];
  },
};

export default nextConfig;
