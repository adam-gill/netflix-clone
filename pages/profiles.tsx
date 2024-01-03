import { useCallback } from "react";

import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import Head from "next/head";

import useCurrentUser from "@/hooks/useCurrentUser";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

const Profiles = () => {
  const imgSrc = images[Math.floor(Math.random() *4)];
  const router = useRouter();
  const { data: user } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Who&#39;s Watching?</title>
        <link rel="icon" href="./netflix-logo.png" />
      </Head>

      <div className="flex items-center h-full justify-center">
        <div className="flex flex-col">
          <h1 className=" text-3xl md:text-6xl text-white text-center">
            Who is watching?
          </h1>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div onClick={selectProfile}>
              <div className=" group flex-row w-44 mx-auto">
                <div className="w-44 h-44 rounded-md flex justify-center items-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                  <img src={imgSrc} alt="profile" />
                </div>

                <div className=" mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                  {user?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profiles;
