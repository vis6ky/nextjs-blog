"use client"

import { useGetPostQuery } from "@/providers/query/api";
import { Person } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import { useEffect, useState, use } from "react";

interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
}

const Post = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params)
  const [post, setPost] = useState<Post | undefined>({
    id: "",
    title: "",
    author: "",
    content: "",
    createdAt: ""
  })
  const { data, isError, isLoading, isFetching } = useGetPostQuery(slug)
  useEffect(() => {
    setPost(data)
  }, [data])

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div className='text-center font-bold text-3xl my-8'>
        {post?.title}
      </div>
      <div className="text-center">
        <Typography variant="subtitle1" gutterBottom>
          <Person sx={{ fontSize: 20, verticalAlign: 'middle', marginRight: 1 }} />
          {post?.author}
        </Typography>
      </div>
      <div className='text-justify my-8'>
        {post?.content}
      </div>
      <div className="text-center">
        {post?.createdAt && (
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Published On: {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default Post;
