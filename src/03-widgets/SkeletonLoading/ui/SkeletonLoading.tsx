import { Grid, Group, Skeleton, Stack } from "@mantine/core";

export const SkeletonLoading = () => {
  return (
    <Stack gap={"lg"}>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
          <Skeleton h={100} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
          <Skeleton h={100} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
          <Skeleton h={100} />
        </Grid.Col>
      </Grid>

      <Group justify="space-between">
        <Skeleton w={300} h={30} />
        <Skeleton w={300} h={50} />
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8.5 }}>
          <Skeleton h={380} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 3.5 }}>
          <Skeleton h={380} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
