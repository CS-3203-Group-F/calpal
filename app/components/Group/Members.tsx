"use client";

import Image from "next/image";
import { Pagination } from "./Pagination";
import { Key, useState } from "react";

// Number of members per pagination page
const membersPerPage = 3;

export function Members(props: { members: any }) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex flex-col items-start self-stretch">
      <MembersHeader members={props.members} setCurrentPage={setCurrentPage} />
      <MembersList members={props.members} currentPage={currentPage} />
    </div>
  );
}

function MembersHeader(props: { members: any; setCurrentPage: any }) {
  return (
    <div className="flex h-16 px-6 justify-between items-center self-stretch">
      <NumberOfMembers members={props.members} />
      <Pagination
        onSetPage={props.setCurrentPage}
        numOfPages={Math.ceil(props.members.length / membersPerPage)}
      />
    </div>
  );
}

const Member = (props: { name: string; profilePicture: string }) => {
  const truncatedName =
    props.name.length > 20 ? props.name.slice(0, 20) + "..." : props.name;

  return (
    <div className="flex flex-col w-24 h-32 p-2 items-center gap-2 rounded-lg cursor-pointer text-center hover:bg-stone-200">
      <div className="w-16 h-16 relative rounded-full overflow-hidden">
        <Image
          src={props.profilePicture}
          fill={true}
          alt={`${props.name}'s profile picture`}
        />
      </div>
      <p className="font-normal text-sm">{truncatedName}</p>
    </div>
  );
};

function MembersList(props: { members: any; currentPage: number }) {
  return (
    <div className="flex flex-row w-full items-center justify-evenly">
      {props.members
        .slice(
          props.currentPage * membersPerPage,
          (props.currentPage + 1) * membersPerPage
        )
        .map((member: { firstName: string; lastName: string; id: string }) => (
          <Member
            name={member.firstName + " " + member.lastName}
            profilePicture={`/profilePictures/${member.id}.png`}
            key={member.id}
          />
        ))}
    </div>
  );
}

function NumberOfMembers(props: { members: any }) {
  return <p className="text-base font-normal">{props.members.length} Pals</p>;
}
