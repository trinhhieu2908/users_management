import React from "react";
import ProvinceTable from "../../components/Provinces/ProvinceTable/ProvinceTable";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton, notification } from "antd";

const ProvincePage = () => {
  const { data: provincesList, isLoading: isGettingProvinces } = useQuery(
    ["provinces"],
    async () => {
      const response = await axios.get(
        "https://provinces.open-api.vn/api/?depth=2"
      );
      const data = await response.data;
      return data;
    },
    {
      onError: () => {
        notification.error({
          description: "Failed to get users",
        });
      },
    }
  );

  if (isGettingProvinces) {
    return <Skeleton active />;
  }

  return <ProvinceTable provincesData={provincesList} />;
};

export default ProvincePage;
