import React from "react";
import { Badge, Descriptions, Row, Col, Button } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import axios from "axios";

export default function LendInformation({
    auth,
    book,
    bookcopy,
    request,
    borrow_lib,
    lend_lib
}) {
    const items = [
        {
            key: "1",
            label: "Tên sách",
            children: book.title,
        },
        {
            key: "2",
            label: "Tác giả",
            children: book.author,
        },
        {
            key: "3",
            label: "Mã ISBN",
            children: bookcopy.ISBN,
        },
        {
            key: "4",
            label: "Thư viện mượn",
            children: borrow_lib,
        },
        {
            key: "5",
            label: "Thư viện cho mượn",
            children: lend_lib,
            span:2
        },
        {
            key: "6",
            label: "Trạng thái",
            span: 3,
            children: (
                <Badge
                    status="default"
                    text={
                        request.status === "pending"
                            ? "Đang chờ"
                            : request.status === "denied"
                            ? "Bị từ chối"
                            : request.status === "awaiting"
                            ? "Chờ xác nhận"
                            : request.status === "canceled"
                            ? "Bị huỷ"
                            : request.status === "dispatched"
                            ? "Đang chuyển"
                            : request.status === "ready"
                            ? "Sẵn sàng"
                            : request.status === "active"
                            ? "Đang mượn"
                            : request.status === "completed"
                            ? "Đã hoàn thành"
                            : request.status
                    }
                />
            ),
        },

        {
            key: "7",
            label: "Ngày mượn sách",
            children: request.borrow_date,
        },
        {
            key: "8",
            label: "Ngày nhận sách",
            children: request.checkout_date,
            span: 2,
        },
        request.due_date &&
            request.return_date && {
                key: "10",
                label: "Hạn trả sách",
                children: request.due_date,
            },
        request.due_date &&
            request.return_date && {
                key: "11",
                label: "Ngày trả sách",
                children: request.return_date,
            },
        // {
        //     key: "11",
        //     label: "Config Info",
        //     children: (
        //         <>
        //             Data disk type: MongoDB
        //             <br />
        //             Database version: 3.4
        //             <br />
        //             Package: dds.mongo.mid
        //             <br />
        //             Storage space: 10 GB
        //             <br />
        //             Replication factor: 3
        //             <br />
        //             Region: East China 1
        //             <br />
        //         </>
        //     ),
        // },
    ].filter(Boolean);

    const handleAcceptClick = async () => {
        try {
            const response = await axios.post("/requests/updateStatus", {
                id: request.id,
                newStatus: "dispatched",
            });
            window.location.reload();

            console.log("Status updated successfully:", response.data);
            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error("Error updating status:", error);
            // Optionally, handle errors or display error messages to the user
        }
    };

    const handleDenyClick = async () => {
        try {
            const response = await axios.post("/requests/updateStatus", {
                id: request.id,
                newStatus: "denied",
            });
            window.location.reload();

            console.log("Status updated successfully:", response.data);
            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error("Error updating status:", error);
            // Optionally, handle errors or display error messages to the user
        }
    };

    const handleCheckoutClick = async () => {
        try {
            const response = await axios.post("/requests/updateStatus", {
                id: request.id,
                newStatus: "active",
            });
            window.location.reload();

            console.log("Status updated successfully:", response.data);
            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error("Error updating status:", error);
            // Optionally, handle errors or display error messages to the user
        }
    };

    const handleCancelClick = async () => {
        try {
            const response = await axios.post("/requests/updateStatus", {
                id: request.id,
                newStatus: "canceled",
            });
            window.location.reload();

            console.log("Status updated successfully:", response.data);
            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error("Error updating status:", error);
            // Optionally, handle errors or display error messages to the user
        }
    };

    const handleReturnClick = async () => {
        try {
            const response = await axios.post("/requests/updateStatus", {
                id: request.id,
                newStatus: "completed",
            });
            window.location.reload();

            // console.log("Status updated successfully:", response.data);
            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error("Error updating status:", error);
            // Optionally, handle errors or display error messages to the user
        }
    };

    let buttonSet = null;

    // Determine which button set to render based on request.status
    if (request.status === "awaiting") {
        buttonSet = (
            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button
                    type="primary"
                    onClick={handleAcceptClick}
                    style={{ marginRight: "10px" }}
                >
                    Gửi sách
                </Button>
                <Button type="primary" onClick={handleDenyClick} danger>
                    Từ chối
                </Button>
            </div>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Row justify="center" style={{ padding: "20px" }}>
                <Col xs={24} sm={20} md={100} lg={100} xl={100}>
                    {/* Control the width with Col */}
                    <Descriptions
                        title="Thông tin phiếu cho mượn"
                        layout="vertical"
                        bordered
                        items={items}
                        extra={
                            <Link href={route('requests.interlibIndex')}>
                                <Button type="primary">Quay lại</Button>
                            </Link>
                        }
                    />
                    {buttonSet}
                </Col>
            </Row>
        </AuthenticatedLayout>
    );
}
