export interface Achievement {
  title: string;
  org: string;
  date: string;
  desc: string;
  url: string;
  type: "image" | "pdf";
}

export interface Project {
  title: string;
  desc: string;
  fullDesc: string;
  tags: string[];
  link: string;
  image: string;
  liveLink?: string;
}
