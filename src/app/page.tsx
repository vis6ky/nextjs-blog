'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Skeleton,

} from '@mui/material';
import Grid from "@mui/material/Grid2";
import { useInView } from 'react-intersection-observer';
import { useGetPostsQuery } from '@/providers/query/api';
import { IPostResponse } from './interface/post';

const LIMIT = 6;

const Home = () => {
  const [pages, setPages] = useState<number>(1);
  const [posts, setPosts] = useState<IPostResponse[]>([]);
  const { ref, inView } = useInView();
  const { data, isError, isLoading, isFetching } = useGetPostsQuery({
    page: pages,
    limit: LIMIT,
  });

  // Append new data when inView
  useEffect(() => {
    if (inView && !isFetching && data && data.length > 0) {
      // Deduplicate posts by ID
      const uniquePosts = [...posts, ...data].filter(
        (post, index, self) =>
          index === self.findIndex((p) => p.id === post.id)
      );

      setPosts(uniquePosts);

      // If more pages are available
      if (data.length === LIMIT) {
        setPages((prev) => prev + 1);
      }
    }
  }, [inView, isFetching, data]);

  if (isLoading) return <Container sx={{ mt: 4 }}>Loading...</Container>;
  if (isError) return <Container sx={{ mt: 4 }}>Failed to load posts.</Container>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts.map((post) => (
          <Grid key={post.id} size={{ xs: 2, sm: 4 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                  {post.author}
                </Typography>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', mb: 1.5 }}
                  variant="caption"
                >
                  {/* Format createdAt here if needed */}
                </Typography>
                <Typography variant="body2">
                  {post.content.substring(0, 230)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`/post/${post.id}`} passHref>
                  <Button size="small">Read More...</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* IntersectionObserver ref */}
      <div ref={ref} />

      {/* Loading Skeleton */}
      {isFetching && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {[...Array(3)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
