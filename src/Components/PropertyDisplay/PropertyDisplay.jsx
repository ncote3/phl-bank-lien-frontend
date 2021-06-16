import React from "react";
import { makeUseAxios } from "axios-hooks";
import axios from "axios";

import Loading from "../Common/Loading";
import Error from "../Common/Error";
import Property from "./Subcomponents/Property";

const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: "https://phl-bank-lien-backend.herokuapp.com/",
  }),
});

const PropertyDisplay = (props) => {
  const { propertyToDisplayObject } = props;

  // eslint-disable-next-line no-unused-vars
  const [dataRes, refetch] = useAxios(
    `/api/accountIdGetsPropertyInformation/${propertyToDisplayObject[0].accountId}`
  );

  if (dataRes.loading) {
    return <Loading />;
  } else if (dataRes.error) {
    return <Error />;
  } else {
    if (dataRes.data.totalRecords) {
      if (dataRes.data.totalRecords === 1) {
        return (
          <Property
            propertyObject={
              dataRes.data.records[Object.keys(dataRes.data.records)[0]]
            }
          />
        );
      } else {
        return <>More than one record</>;
      }
    } else {
      return <>Oopsie Poopsie!</>;
    }
  }
};

export default PropertyDisplay;
