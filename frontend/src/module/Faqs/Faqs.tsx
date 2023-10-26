import React, { useState } from "react";
import { FAQ } from "../../constant/Faq";
import FaqsItem from "./FaqsItem";
import FaqImg from "../../assets/FaqsImg.png";
const Faqs = () => {
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        const newActiveId = activeId === id ? null : id;
        setActiveId(newActiveId);
    }

    return (
        <section className=" mt-28 bg-gray-20">
            <div className="w-5/6 mx-auto">
                <h1 className="text-5xl font-bold text-center">Most Questions By</h1>
                <h2 className="text-5xl font-bold text-center">our beloved Members</h2>
                <article className="flex mt-8 w-12/12 gap-x-4">
                    <div className="basis-5/12">
                        <img src={FaqImg} alt="" />
                    </div>
                    <div className="basis-7/12">
                        {FAQ.map((item, index) => (
                            <FaqsItem
                                key={index}
                                id={item.id}
                                question={item.question}
                                content={item.content}
                                activeId={activeId}
                                toggleAccordion={toggleAccordion}
                            />
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Faqs;
