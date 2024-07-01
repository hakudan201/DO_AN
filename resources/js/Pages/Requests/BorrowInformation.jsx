import React from "react";
import { Badge, Descriptions, Row, Col, Button } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import axios from "axios";

export default function BorrowInformation({
    auth,
    book,
    bookcopy,
    user,
    request,
    borrow_lib,
    lend_lib,
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
            label: "Người mượn",
            children: user.name,
        },
        {
            key: "5",
            label: "Email",
            children: user.email,
        },
        {
            key: "6",
            label: "Số điện thoại",
            children: user.phone,
        },
        {
            key: "7",
            label: "Thư viện mượn",
            children: borrow_lib,
        },
        {
            key: "8",
            label: "Thư viện cho mượn",
            children: lend_lib,
            span: 2,
        },
        {
            key: "9",
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
            key: "10",
            label: "Ngày mượn sách",
            children: request.borrow_date,
        },
        {
            key: "9",
            label: "Ngày nhận sách",
            children: request.checkout_date,
            span: 2,
        },
        request.due_date && {
            key: "10",
            label: "Hạn trả sách",
            children: request.due_date,
        },
        request.return_date && {
            key: "11",
            label: "Ngày trả sách",
            children: request.return_date,
        },
    ].filter(Boolean);

    const handleAcceptClick = async () => {
        try {
            const response = await axios.post("/requests/updateStatus", {
                id: request.id,
                newStatus: "ready",
            });
            window.location.reload();

            console.log("Status updated successfully:", response.data);
            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error("Error updating status:", error);
            // Optionally, handle errors or display error messages to the user
        }
    };

    const handleRequestInterlibClick = async () => {
        try {
            const response = await axios.post("/requests/updateStatus", {
                id: request.id,
                newStatus: "awaiting",
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
    if (request.status === "pending") {
        buttonSet = (
            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button
                    type="primary"
                    onClick={handleRequestInterlibClick}
                    style={{ marginRight: "10px" }}
                >
                    Gửi yêu cầu liên thư viện
                </Button>
                <Button type="primary" onClick={handleDenyClick} danger>
                    Từ chối
                </Button>
            </div>
        );
    } else if (request.status === "dispatched") {
        buttonSet = (
            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button
                    type="primary"
                    onClick={handleAcceptClick}
                    style={{ marginRight: "10px" }}
                >
                    Xác nhận nhận sách
                </Button>
            </div>
        );
    } else if (request.status === "ready") {
        buttonSet = (
            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button
                    type="primary"
                    onClick={handleCheckoutClick}
                    style={{ marginRight: "10px" }}
                >
                    Xác nhận lấy sách
                </Button>
                <Button type="primary" onClick={handleCancelClick} danger>
                    Huỷ
                </Button>
            </div>
        );
    } else if (request.status === "active") {
        buttonSet = (
            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Button
                    type="primary"
                    onClick={handleReturnClick}
                    style={{ marginRight: "10px" }}
                >
                    Xác nhận trả sách
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
                        title="Thông tin phiếu mượn liên thư viện"
                        layout="vertical"
                        bordered
                        items={items}
                        extra={
                            <Link href={route("requests.interlibIndex")}>
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
