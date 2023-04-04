import Image from "next/image";
import styles from "@/styles/DisplayTree.module.scss";

interface DisplayTreeProps {
  treeDisplay: string;
}

const DisplayTree: React.FC<DisplayTreeProps> = ({ treeDisplay }) => {
  return (
    <div className={styles.treeDiv}>
      {treeDisplay === "huge" && (
        <Image
          id="HugeTree"
          src="/static/images/huge.png"
          alt="huge tree"
          width={48 * 3.1}
          height={87 * 3.1}
        />
      )}
      {treeDisplay === "large" && (
        <Image
          id="LargeTree"
          src="/static/images/large.png"
          alt="large tree"
          width={46 * 3}
          height={63 * 3}
        />
      )}
      {treeDisplay === "medium" && (
        <Image
          id="MediumTree"
          src="/static/images/medium.png"
          alt="medium tree"
          width={24 * 3}
          height={32 * 3}
        />
      )}
      {treeDisplay === "small" && (
        <Image
          id="SmallTree"
          src="/static/images/small.png"
          alt="small tree"
          width={16 * 3.5}
          height={19 * 3.5}
        />
      )}
      {treeDisplay === "smol" && (
        <Image
          id="SmolTree"
          src="/static/images/smol.png"
          alt="smoll tree"
          width={16 * 3}
          height={13 * 3}
        />
      )}
      {treeDisplay === "tiny" && (
        <Image
          id="TinyTree"
          src="/static/images/tiny.png"
          alt="tiny tree"
          width={7 * 3}
          height={6 * 3}
        />
      )}
      {treeDisplay === "trunk" && (
        <Image
          id="TrunkTree"
          src="/static/images/trunk.png"
          alt="trunk tree"
          width={200 / 4}
          height={200 / 4}
        />
      )}
    </div>
  );
};

export default DisplayTree;
