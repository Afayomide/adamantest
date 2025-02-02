'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import { IoMdChatboxes } from "react-icons/io";
import Link from 'next/link'
import { useConversations } from "@/context/conversationContext";
import { Conversation } from './types'





export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {conversations, loading} = useConversations();

  


  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <IoMdChatboxes className="h-8 w-auto"/>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
        Conversations
        <ChevronDownIcon aria-hidden="true" className="w-5 h-5 flex-none text-gray-400" />
      </PopoverButton>

      <PopoverPanel className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition">
        <div className="p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : conversations?.length === 0 ? (
            <p className="text-center text-gray-500">You have no conversations yet.</p>
          ) : (
            conversations.map((conversation:Conversation) => (
              <div
                key={conversation.id}
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
              >
                <div className="flex w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  {/* Display the first character of the userEmail as an avatar */}
                  <span className="text-gray-600 text-lg font-bold">
                    {conversation.userEmail?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-auto">
                  <Link href={`/conversation/${conversation.id}`} className="block font-semibold text-gray-900">
                    {conversation.userEmail}
                    <span className="absolute inset-0" />
                  </Link>
                  <p className="mt-1 text-gray-600">
                    {conversation.messages?.length > 0
                      ? conversation.messages[conversation.messages?.length - 1].text
                      : "No messages yet"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverPanel>
    </Popover>
         
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <IoMdChatboxes
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
    Conversations
    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
  </DisclosureButton>
  <DisclosurePanel className="mt-2 space-y-2">
    {conversations?.length === 0 ? (
      <p className="text-center text-gray-500">You have no conversations yet.</p>
    ) : (
      conversations.map((conversation: Conversation) => (
        <DisclosureButton
          key={conversation.id}
          as="a"
          href={`/conversation/${conversation.id}`}
          className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
        >
          {conversation.userEmail}
        </DisclosureButton>
      ))
    )}
  </DisclosurePanel>
</Disclosure>
               
              </div>
              <div className="py-6">
              
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
