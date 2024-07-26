// import { ReusableTable } from "../../../components";
import API_WRAPPER from "../../../api";
import { useEffect, useMemo, useState } from "react";
import ReusableTable from "../../../components/ui/Tables";

// function VendorAndOrderList(){
//   const [ordersList, setOrdersList] = useState([]);

//   const getOrdersList = async () => {
//     // try {
//     //   const response = await API_WRAPPER.get("/order/get-orders");
//     //   if (response.status === 200) {
//     //     setOrdersList(response?.data);
//     //     console.log("ORDERS LIST: ", response?.data);
//     //     // debouncedShowToast("Orders list loaded successfully", "success");
//     //   }
//     // } catch (error) {
//     // //   debouncedShowToast(error?.message, "error");
//     // }
//   };

//   const orderTableColumns = useMemo(
//     () => [
//       {
//         Header: "Payment Status",
//         accessor: "payment_status",
//       },
//       {
//         Header: "Order Status",
//         accessor: "order_status",
//       },
//       {
//         Header: "Address ID",
//         accessor: "address_id",
//       },
//     ],
//     []
//   );

//   const orderTableData = useMemo(() => ordersList, [ordersList]);

//   useEffect(() => {
//     getOrdersList();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card border-0 shadow-sm">
//             <div className="card-body">
//               <h2 className="font-semibold text-lg mb-3">Recent Orders</h2>
//               <ReusableTable
//                 data={orderTableData}
//                 columns={orderTableColumns}
//                 pageSize={10}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

function VendorAndOrderList(){
  // Define static orders list data
  const ordersList = [
    { id: 1, payment_status: "Paid", order_status: "Delivered", address_id: 123 },
    { id: 2, payment_status: "Pending", order_status: "Processing", address_id: 456 },
    { id: 3, payment_status: "Paid", order_status: "Delivered", address_id: 789 },
  ];

  const orderTableColumns = useMemo(
    () => [
      {
        Header: "Payment Status",
        accessor: "payment_status",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
      {
        Header: "Address ID",
        accessor: "address_id",
      },
    ],
    []
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* <h2 className="font-semibold text-lg mb-3">Recent Orders</h2> */}
              <ReusableTable
                data={ordersList}
                columns={orderTableColumns}
                pageSize={10}
                tableTitle="Recent Orders"
                enablePagination={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAndOrderList;
