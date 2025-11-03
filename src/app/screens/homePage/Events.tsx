import { Box, Stack } from "@mui/material";
import Swiper from "../../../app/components/common/Swiper"; 
import "../../css/homePage.css";
import { plans } from "../../../app/libs/data/plans";

export default function Events() {
  return (
    <div className="events-frame">
      <Stack className="events-main">
        <Box className="events-text">
          <span className="category-title">Events</span>
        </Box>

        <div className="events-swiper-container">
          <Swiper
            slidesPerView={4}
            spaceBetween={200}
            loop
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slides={plans.map((value, number) => (
              <div key={number} className="events-info-frame">
                <div className="events-img">
                  <img src={value.img} alt={value.title} />
                </div>
                <Box className="events-desc">
                  <Box className="events-bott">
                    <Box className="bott-left">
                      <div className="event-title-speaker">
                        <strong>{value.title}</strong>
                      </div>

                      <p className="text-desc">{value.desc}</p>

                    </Box>
                  </Box>
                </Box>
              </div>
            ))}
          />
         
        </div>
      </Stack>
    </div>
  );
}
