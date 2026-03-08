"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TemplateSwitcher from "@/components/TemplateSwitcher";
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";

type TemplateId = 1 | 2;
export type ServiceLine = "banqueteria" | "cocinería";

function buildSearch(template: TemplateId, linea: ServiceLine): string {
  const params = new URLSearchParams();
  params.set("template", String(template));
  params.set("linea", linea);
  return "?" + params.toString();
}

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [template, setTemplate] = useState<TemplateId>(1);
  const [serviceLine, setServiceLine] = useState<ServiceLine>("banqueteria");

  useEffect(() => {
    const t = searchParams?.get("template");
    if (t === "2") setTemplate(2);
    else if (t === "1") setTemplate(1);
    const l = searchParams?.get("linea");
    if (l === "cocinería" || l === "cocineria") setServiceLine("cocinería");
    else if (l === "banqueteria") setServiceLine("banqueteria");
  }, [searchParams]);

  const handleChangeTemplate = useCallback(
    (id: TemplateId) => {
      setTemplate(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.replace(buildSearch(id, serviceLine), { scroll: false });
    },
    [router, serviceLine]
  );

  const handleChangeServiceLine = useCallback(
    (linea: ServiceLine) => {
      setServiceLine(linea);
      router.replace(buildSearch(template, linea), { scroll: false });
    },
    [router, template]
  );

  return (
    <>
      <div className="h-12" aria-hidden />
      <TemplateSwitcher activeTemplate={template} onChange={handleChangeTemplate} />
      {template === 1 ? (
        <Template1 serviceLine={serviceLine} onChangeServiceLine={handleChangeServiceLine} />
      ) : (
        <Template2 serviceLine={serviceLine} onChangeServiceLine={handleChangeServiceLine} />
      )}
    </>
  );
}
