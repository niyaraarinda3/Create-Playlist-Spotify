import * as React from "react";
import "./kodeSong";
import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PickSong({ coverAlbum, titleSong, nameArtist }) {
  return (
    //<div className="cardss">
    <Card
      sx={{
        maxWidth: 100,
        maxHeight: "auto",
        marginTop: ".4rem",
        backgroundColor: "orange",
        borderRadius: ".5rem",
        float: "left",
        marginLeft: ".1rem",
        marginBottom: ".5rem",
        border: "1px solid #ffff00",
        width: "6%",
        height: "195px",
        fontSize: "11px",
      }}
    >
      <CardMedia component="img" image={coverAlbum} alt="" />
      <Typography
        gutterBottom
        textAlign={"justify"}
        fontSize={"10px"}
        component="div"
        sx={{ color: "white" }}
      >
        {titleSong}
      </Typography>
      <div className="kotak-main">
        <p>
          {nameArtist.map((artist) => artist.name).join(", ").length > 25
            ? `${nameArtist
                .map((artist) => artist.name)
                .join(", ")
                .substring(0, 25)}...`
            : nameArtist.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </Card>
  );
}
