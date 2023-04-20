import React from "react";
import ProvinceTable from "../../components/Provinces/ProvinceTable/ProvinceTable";
import axios from "axios";
import { useQuery } from "react-query";

const ProvincePage = () => {
  const {
    data: provincesList,
    isLoading: isGettingProvinces,
    refetch,
  } = useQuery(
    ["provinces"],
    async () => {
      const response = await axios.get(
        "https://provinces.open-api.vn/api/?depth=2"
      );
      console.log(response);
      const data = await response.data;
      return data;
    },
    {
      onError: () => {
        console.log("error get provinces");
      },
    }
  );
  return <ProvinceTable provincesData={provincesList} />;
};

export default ProvincePage;
