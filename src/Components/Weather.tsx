import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayRainMix,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiHot,
  WiRain,
  WiSnow,
  WiSnowflakeCold,
  WiThunderstorm,
} from "react-icons/wi";
import { useRecoilState } from "recoil";
import { weatherState } from "../atoms";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 15px;
`;

const Container = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: space-between;
  padding: 0 30px;
  padding-top: 20px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
`;

const Icon = styled.span`
  svg {
    box-sizing: content-box;
    width: 36px;
    height: 36px;
    vertical-align: top;
    padding: 0 10px;
    text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
  }
`;

const Location = styled.span`
  font-size: 18px;
  text-align: right;
`;

const Temperature = styled.span`
  font-size: 28px;
`;

const WeatherBox = styled.div``;

interface ITemp {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

function Weather() {
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState<ITemp>();
  const [weather, setWeather] = useState<IWeather>();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const API_KEY = "aa0e3fd16c9e2ed8ed253b5986b3ce7a";

  function handleSuccess(position: any) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coordsObj = {
      lat,
      lon,
    };
    getWeather(lat, lon);
  }

  function handleError() {
    console.log("Error");
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }

  const getWeather = async (lat: number, lon: number) => {
    const json = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
    ).json();
    setWeather(json.weather[0]);
    setTemp(json.main);
    setName(json.name);
    setIcon(json.weather[0].description);
    console.log(json);
  };

  useEffect(() => {
    requestCoords();
  }, []);

  return (
    <Wrapper>
      <Container>
        <WeatherBox>
          <Icon>
            {icon === "clear sky" ? (
              <WiDaySunny />
            ) : icon === "few clouds" ? (
              <WiDayCloudy />
            ) : icon === "scattered clouds" ? (
              <WiCloud />
            ) : icon === "broken clouds" ? (
              <WiCloudy />
            ) : icon === "overcast clouds" ? (
              <WiDaySunnyOvercast />
            ) : icon === "shower rain" ? (
              <WiRain />
            ) : icon === "rain" ? (
              <WiDayRainMix />
            ) : icon === "thunderstrom" ? (
              <WiThunderstorm />
            ) : icon === "snow" ? (
              <WiSnow />
            ) : (
              <WiFog />
            )}
          </Icon>
          <Temperature>{temp?.temp}°</Temperature>
        </WeatherBox>
        <Location>@{name}</Location>
      </Container>
    </Wrapper>
  );
}

export default Weather;
