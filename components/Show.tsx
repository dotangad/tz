import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  height: 100%;
  color: #333;
  display: flex;
  flex-direction: column;

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 2rem;
      font-weight: 400;
    }

    h1 {
      font-size: 5rem;
    }
  }

  footer {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
`;

interface IShowProps {
  date: string;
  time: string;
  timezone: string;
}

const Show: React.FC<IShowProps> = ({ date, time, timezone }: IShowProps) => {
  return (
    <Container>
      <div>
        <h3>{date}</h3>
        <h1>{time}</h1>
        <h3>{timezone}</h3>
      </div>
      <footer>
        <span>
          by{" "}
          <a
            href="https://github.com/dotangad"
            target="_blank"
            rel="noreferrer"
          >
            dotangad
          </a>
          ,{" "}
          <a
            href="https://github.com/dotangad/kaal"
            target="_blank"
            rel="noreferrer"
          >
            source available
          </a>
        </span>
      </footer>
    </Container>
  );
};

export default Show;
