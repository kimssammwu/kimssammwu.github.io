import React from "react"
import { Link } from "gatsby"

type PostProps = {
    post_title: string;
    post_description: string;
    written_date: string;
    thumbnail_img?: any;
};

function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${month}월 ${day}일`;
}

const PostCard: React.FC<PostProps> = ({ post_title, post_description, written_date, thumbnail_img }) => {
    const formatted_date = formatDate(written_date);
    return (
        <Link to="">
            <div className="group w-[700px] py-6 px-2.5">
                <div className="flex">
                    {thumbnail_img}
                    {/* <div className="w-36 h-24 rounded bg-gray-200 mr-4"></div> */}
                    <div className="w-[520px] ">
                        <h1 className="block mb-2 font-semibold text-xl strong group-hover:text-indigo-600">{post_title}</h1>
                        <span className="block mb-4 text-base text-gray-600">{post_description}</span>
                        <span className="block text-sm text-gray-600">{formatted_date}에 작성됨</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard

