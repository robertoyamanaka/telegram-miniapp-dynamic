"use client";

import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

import { RedeemCodeForm } from "./redeem-code.form";

export default function RedeemPage({
  params,
}: {
  params: { redeemCode: string };
}) {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
      <div className="border-2 border-white p-5 rounded-lg shadow-2xl mb-7 mt-7 text-sm py-6 mx-4 justify-center items-center">
        <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Redeem your code
        </h2>
        <p className="mx-auto mb-4 mt-6 max-w-lg text-center text-lg text-gray-300">
          You are logged in with
        </p>
        <DynamicWidget />
        {isLoggedIn && <RedeemCodeForm defaultRedeemCode={params.redeemCode} />}
      </div>
    </div>
  );
}
