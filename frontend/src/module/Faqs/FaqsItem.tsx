import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FAQs } from '../../types/Faqs'
import Card from '../../components/Card'

type ExtendedFaqs = FAQs & {
    activeId: null | number;
    toggleAccordion: (id: number) => void;
};

const FaqsItem = ({ id, question, content, activeId, toggleAccordion }: ExtendedFaqs) => {

    const isActive = id === activeId

    return (
        <Card className='p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer'>
            <article className='flex items-center justify-between' onClick={() => toggleAccordion(id)}>
                <h4>{question}</h4>
                <div
                    className={`${isActive && "bg-primary-500 text-white border-none"
                        } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
                >
                    {isActive ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </div>
            </article>
            {isActive && (
                <div className="mt-4">
                    <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                        {content}
                    </p>
                </div>
            )}
        </Card>
    )
}

export default FaqsItem