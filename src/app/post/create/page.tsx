"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useCreatePostMutation } from "@/providers/query/api";

const CreatePost = () => {
  const [createPost, { data, isLoading, isError, isSuccess, error }] = useCreatePostMutation();
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createPost({ title, author, content });
  }

  if (isSuccess) {
    router.push(`/post/${data.id}`);
  }

  if (isError) return <div>Error</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ my: "1rem" }}>
          Create New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="title" label="Title" variant="filled" onChange={e => setTitle(e.target.value)} />
          <TextField name="author" label="Author" variant="filled" onChange={e => setAuthor(e.target.value)} />
          <TextField
            id="filled-multiline-static"
            label="Content"
            multiline
            rows={4}
            variant="filled"
            name="content"
            onChange={e => setContent(e.target.value)}
          />
          <Button variant="contained" type={'submit'} color={'primary'}>
            {isLoading ? "Sending..." : "Submit"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CreatePost;
