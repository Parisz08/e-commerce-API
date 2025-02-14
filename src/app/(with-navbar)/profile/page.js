"use client"
import { useAuth } from "@/core/useAuth";
import { Fragment } from "react";

export default function Profile() {
    const user = useAuth();
    if(!user) return;

    return (
        <Fragment>
            <div>Profile</div>
        </Fragment>
    );
}