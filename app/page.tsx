"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TemplateSwitcher from "@/components/TemplateSwitcher";
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";

type TemplateId = 1 | 2;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [template, setTemplate] = useState<TemplateId>(1);

  useEffect(() => {
    const t = searchParams?.get("template");
    if (t === "2") setTemplate(2);
    else if (t === "1") setTemplate(1);
  }, [searchParams]);

  const handleChangeTemplate = useCallback(
    (id: TemplateId) => {
      setTemplate(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.replace(id === 2 ? "?template=2" : "?template=1", { scroll: false });
    },
    [router]
  );

  return (
    <>
      <div className="h-12" aria-hidden />
      <TemplateSwitcher activeTemplate={template} onChange={handleChangeTemplate} />
      {template === 1 ? <Template1 /> : <Template2 />}
    </>
  );
}
