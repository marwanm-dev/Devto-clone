import { useEffect } from 'react';
import tw from 'twin.macro';
import { useGetNumTagsQuery } from '../../../core/features/tags/tagsApiSlice';
import Tag from './Tag';

const Tags = () => {
    const { data: tags } = useGetNumTagsQuery(null, { refetchOnMountOrArgChange: true });

    return <Wrapper>{tags && tags.map((tag, i) => <Tag tag={tag} key={i} />)}</Wrapper>;
};

const Wrapper = tw.div`w-1/2 flex flex-col gap-sm`;

export default Tags;
