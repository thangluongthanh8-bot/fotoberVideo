'use client'
import React from 'react'
function LayoutMain({
  children,
}: {
  children: React.ReactNode
  classHeader?: string
}) {


  // async function getRealIpThroughVPN() {
  //   const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
  //   pc.createDataChannel("");
  //   pc.createOffer().then(offer => pc.setLocalDescription(offer));
  //   pc.onicecandidate = (ice) => {
  //     if (!ice || !ice.candidate || !ice.candidate.candidate) return;
  //     console.log("1111",ice.candidate.candidate)
  //     const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
  //     const realIp = ipRegex.exec(ice.candidate.candidate)[1];
  //     console.log("IP thật phát hiện qua WebRTC:", realIp);
  //   };
  // }
  // getRealIpThroughVPN()
  

  return (
    <main className="bg-white font-montserrat text-[#043263] relative z-10 lg:pt-[80px] overflow-x-hidden">
      {children}
    </main>
  )
}

export default LayoutMain



