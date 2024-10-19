import React, { ReactNode, useEffect, useState } from 'react';
import { throttle } from 'lodash';


type NativeHtml = {
  nativeHtml: string | TrustedHTML;
};

const getNestedListItems = (element: HTMLElement): HTMLElement[] => {
  const listItems: HTMLElement[] = [];

  const liElements = element.getElementsByTagName('li');
  for (const li of liElements) {
    listItems.push(li);
  }
  return listItems;
};


function minusWeightedFunctionToPositive(value: number) {
  if (value <= 0) {
    return -2 * value; // 양수처리
  }
  return value; // 이미 양수
}



const TableOfContentElement: React.FC<NativeHtml> = ({ nativeHtml }) => {
  const [headers, setHeaders] = useState<Element[]>([]);

  const updateTOC = () => {
    let nearestElement: Element | null = null;
    let nearestIndex = -1;
    let currentDistance = Infinity;
    
    headers.forEach((header, index) => {
      const distance = minusWeightedFunctionToPositive(header.getBoundingClientRect().top);
      
      if (distance < currentDistance) {
        nearestElement = header;
        nearestIndex = index;
        currentDistance = distance;
      }
    });
    
    
    if (nearestElement) {
      const TOC = document.getElementById("toc");
      if (TOC == null) { return ; }
      const allListItems = getNestedListItems(TOC);
      
      allListItems.forEach((list) => {
        list.classList.remove("current-toc")
      })
      const targetList = allListItems[nearestIndex];
      targetList.classList.add("current-toc")
    }
  }

  const onScroll = throttle(() => {
    updateTOC()
  }, 100);



  useEffect(() => {
    const headerElements = document.getElementsByClassName("toc-linked-header");
    const headersArray = Array.from(headerElements);
    const realHeaderArray = Array();

    headersArray.forEach(header => {
      if (header.parentElement?.textContent !== "") {
        realHeaderArray.push(header);
      }
    });

    setHeaders(realHeaderArray);
    
    const TOC = document.getElementById("toc");
    if (TOC == null) { return ; }
    const allListItems = getNestedListItems(TOC);
    allListItems.forEach((list, index) => {
      const targetHeader = headersArray[index];
      const targetHeaderPosTop = targetHeader.getBoundingClientRect().top + window.scrollY;
      list.addEventListener('click', e => {
        e.preventDefault()
        window.scroll({ top: targetHeaderPosTop, behavior: 'smooth' })
      })
    })
    

  }, []);

  useEffect(() => {
    updateTOC();
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); };
  }, [headers]);



  return (
    <div id="toc" className="hidden xl:block" dangerouslySetInnerHTML={{ __html: nativeHtml }} />
  );
};

export default TableOfContentElement;