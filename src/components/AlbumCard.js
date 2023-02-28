import { Box, Card, CardContent, CardMedia, Container } from "@mui/material";

const AlbumCard = (props) => {
  const { albums } = props;
  return (
    <div>
      <Container>
        {albums.map((album) => (
          <div key={album.id}>
            <Card variant="outlined" sx={{ display: "flex" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", minWidth: 275 }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  {album.images.length ? (
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={album.images[0].url}
                      alt={album.name}
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                  <div>
                    {album.artists[0].name} - {album.name}
                  </div>
                </CardContent>
              </Box>
            </Card>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AlbumCard;
