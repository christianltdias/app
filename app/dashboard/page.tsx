"use client";

import PageComponent from "../../components/page/page";
import Button from "../../components/buttons/common/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "../../components/modal/modal";
import { useState } from "react";

export default function Page() {
  const pathName = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <PageComponent
      title="Dashboard"
      buttons={[
        {
          children: (
            <Button
              color="primary"
              type="filled"
              onClick={() => router.push(`${pathName}/details`)}
            >
              Primary
            </Button>
          ),
        },
        {
          children: (
            <Button
              color="secondary"
              type="filled"
              onClick={() => setShowModal(true)}
            >
              Secondary
            </Button>
          ),
        },
        {
          children: (
            <Button
              color="tertiary"
              type="filled"
              onClick={() => router.push(`/`)}
            >
              Tertiary
            </Button>
          ),
        },
        {
          children: (
            <Button
              color="quartenary"
              type="filled"
              onClick={() => router.push(`/`)}
            >
              Quartenary
            </Button>
          ),
        },
        {
          children: (
            <Button
              color="error"
              type="filled"
              onClick={() => router.push(`/`)}
            >
              Error
            </Button>
          ),
        },
      ]}
    >
      <p>Hello, Dashboard Page!</p>
      {showModal && (
        <Modal
          title="Error"
          onClose={() => setShowModal(false)}
          type='error'
          buttons={[
            {
              children: (
                <Button
                  color="error"
                  type="filled"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              ),
            },
            {
              children: (
                <Button
                  color="primary"
                  type="filled"
                  onClick={() => setShowModal(false)}
                >
                  Acknowledge
                </Button>
              ),
            }
          ]}
          >
          <div>
            <h1>An error happened</h1>
          </div>
        </Modal>
      )}
    </PageComponent>
  );
}
