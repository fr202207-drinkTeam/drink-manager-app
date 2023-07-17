import "cross-fetch/polyfill"
import { FirebaseApp } from "firebase/app"
import { Auth, GoogleAuthProvider } from "firebase/auth"
import {
  FirebaseStorage,
  StorageReference,
  UploadMetadata,
  UploadTask,
} from "firebase/storage"
import ImgPathConversion from "../../utils/ImgPathConversion"

jest.mock("firebase/app", () => ({
  initializeApp: () => ({} as FirebaseApp),
}))
jest.mock("firebase/auth", () => ({
  getAuth: () => ({} as Auth),
  GoogleAuthProvider: () => GoogleAuthProvider,
}))
jest.mock("firebase/storage", () => ({
  getStorage: () => ({} as FirebaseStorage),
}))
jest.mock("@firebase/storage", () => ({
  ref: (storage: FirebaseStorage, url?: string) => ({} as StorageReference),
  uploadBytesResumable: (
    ref: StorageReference,
    data: Blob | Uint8Array | ArrayBuffer,
    metadata?: UploadMetadata
  ) => ({} as UploadTask),
}))

describe("ImgPathConversion", () => {
  const mockFiles = [1, 2, 3].map(
    (num) => new File([`hello${num}`], `hello.png${num}`, { type: "image/png" })
  )
  test("アンケートの取得ができる", async () => {
    jest.mock("uuid", () => ({
      uuidv4: () => "mockUUID",
    }))
    expect(await ImgPathConversion({ imgFiles: mockFiles })).toStrictEqual({})
  })
})
