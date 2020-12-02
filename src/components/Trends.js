import React from "react";
import { ListGroup } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getTrends } from "../utils/api-client";
import Spinner from "./Spinner";

export default function Trends({ length }) {
  const { data: trends, isLoading, isSuccess } = useQuery("Trends", getTrends);

  if (isLoading) return <Spinner />;

  if (!trends?.length) {
    return <div className="message">No trends right now</div>;
  }

  return (
    <ListGroup variant="flush">
      {isSuccess
        ? trends.slice(0, length).map((trend) => (
            <ListGroup.Item
              key={trend.name}
              as={Link}
              action
              to={`/search?q=${trend.query}`}
            >
              <small className="text-muted">Trending Worldwide</small>
              <p className="mb-1 text-dark font-weight-bold text-capitalize">
                {trend.name}
              </p>
              <em>{trend.tweet_volume} Tweets</em>
            </ListGroup.Item>
          ))
        : null}
    </ListGroup>
  );
}
