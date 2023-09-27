import React, { useEffect, useState } from "react";

export default function PageTitle(props) {
  const { title } = props;
  const [pageTitle, setPageTitle] = useState(title);
  useEffect(() => {
    document.title = pageTitle;
  }, []);

  return <></>;
}
