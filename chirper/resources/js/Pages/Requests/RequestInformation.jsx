import React from "react";
import { Badge, Descriptions, Row, Col, Button } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function RequestInformation({ auth }) {
    const { props } = usePage();
    const { requestData } = props;
    const items = [
        {
            key: "1",
            label: "Product",
            children: "Cloud Database",
        },
        {
            key: "2",
            label: "Billing Mode",
            children: "Prepaid",
        },
        {
            key: "3",
            label: "Automatic Renewal",
            children: "YES",
        },
        {
            key: "4",
            label: "Order time",
            children: "2018-04-24 18:00:00",
        },
        {
            key: "5",
            label: "Usage Time",
            span: 2,
            children: "2019-04-24 18:00:00",
        },
        {
            key: "6",
            label: "Status",
            span: 3,
            children: <Badge status="processing" text="Running" />,
        },
        {
            key: "7",
            label: "Negotiated Amount",
            children: "$80.00",
        },
        {
            key: "8",
            label: "Discount",
            children: "$20.00",
        },
        {
            key: "9",
            label: "Official Receipts",
            children: "$60.00",
        },
        {
            key: "10",
            label: "Config Info",
            children: (
                <>
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1
                    <br />
                </>
            ),
        },
    ];

    const handleButton1Click = () => {
        // Handle button 1 click action here
        console.log("Button 1 clicked");
    };

    const handleButton2Click = () => {
        // Handle button 2 click action here
        console.log(requestData);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Row justify="center" style={{ padding: "20px" }}>
                <Col xs={24} sm={20} md={100} lg={100} xl={100}>
                    {/* Control the width with Col */}
                    <Descriptions
                        title="User Info"
                        layout="vertical"
                        bordered
                        items={items}
                        extra={<Button type="primary">Edit1</Button>,
                        <Button type="primary">Edit2</Button>}
                    />
                    <div style={{ marginTop: "20px", textAlign: "right" }}>
                            {/* Button 1 */}
                            <Button type="primary" onClick={handleButton1Click} style={{ marginRight: "10px" }}>
                                Button 1
                            </Button>
                            {/* Button 2 */}
                            <Button onClick={handleButton2Click}>
                                Button 2
                            </Button>
                        </div>
                </Col>
            </Row>
        </AuthenticatedLayout>
    );
}
