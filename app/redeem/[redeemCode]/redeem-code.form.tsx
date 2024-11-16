"use client";

import { useState } from "react";
import { useRedeem } from "./use-redeem";
import { Spinner } from "@/lib/spinner";
import { joinClassNames } from "@/lib/join-classnames";
import ReactConfetti from "react-confetti";
import { useRouter } from "next/navigation";

export function RedeemCodeForm({
  defaultRedeemCode,
}: {
  defaultRedeemCode: string;
}) {
  const router = useRouter();
  const [redeemCode, setRedeemCode] = useState<string>(defaultRedeemCode);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { mutateAsync: redeem, isPending, error } = useRedeem();

  const triggerRedeem = async () => {
    setShowModal(true);
    await redeem({
      redeemCode,
      walletAddress: "0x123",
      telegramUsername: "telegramUser",
    });
    setShowConfetti(true);
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative rounded-lg bg-black border-2 border-white p-6 shadow-xl">
            <div className="flex flex-col items-center gap-4">
              {isPending ? (
                <div>
                  <code className="font-mono bg-gray-800 px-2 py-1 rounded">
                    Redeeming Gift Card...
                  </code>
                </div>
              ) : error ? (
                <div>
                  <p className="text-lg font-medium text-red-500">
                    {error.message}
                  </p>

                  <button
                    className="mt-4 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 active:bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium text-white">
                    🎉🎉🎉 Gift Card Redeemed! 🎉🎉🎉
                  </p>
                  <button
                    className="mt-4 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 active:bg-gray-300"
                    onClick={() => {
                      setShowModal(false);
                      router.push("/");
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 flex max-w-md flex-col gap-x-4">
        <div className="flex flex-row gap-x-2">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="redeem-code"
            name="redeem-code"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
            type="text"
            placeholder="Enter your code"
            autoComplete="redeem-code"
            className="min-w-0 flex-auto rounded-md border-2 border-white bg-black px-3.5 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          />
          <button
            type="submit"
            onClick={triggerRedeem}
            disabled={isPending}
            className={joinClassNames(
              isPending ? "cursor-not-allowed opacity-50" : "",
              "flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 active:bg-gray-300"
            )}
          >
            {isPending ? "Redeeming" : "Redeem Code 🥳"}
          </button>
        </div>
        {error && <p className="mt-1 text-red-500">{error.message}</p>}
      </div>
    </>
  );
}
