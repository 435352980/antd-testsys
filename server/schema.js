import { makeExecutableSchema } from 'graphql-tools';
import * as vouchQuery from './resolvers/vouch';

let schema = `
    #调拨单
    type VouchInfo{
        vouchHeader: VouchHeader
        vouchItems:[ VouchItem ]
    }
    type VouchHeader{
        code: String
	    crtdate: String
	    state: Int
	    maker: String
	    odep: String
	    idep: String
	    owh: String
	    iwh: String
        remark: String
    }
    #调拨单子项
    type VouchItem{
        id: Int
        code: String
        cat: String
        model: String
        color: String
        qty: Int
        price: Float
    }

    #根查询对象
    type Query{
        #创建单据
        createVouch(maker: String):String
        #删除单据
        deleteVouch(code: String):String
        #修改单据
        editVouch(code: String):String
        #保存单据
        saveVouch(
            code: String
            crtdate: String
            state: Int
            maker: String
            odep: String
            idep: String
            owh: String
            iwh: String
            remark: String
        ):String
        #根据条件获取单据号
        getVouchCodes( 
            code: String 
            from: String 
            to: String 
            state: Int 
            maker: String 
            odep: String 
            idep: String 
            owh: String 
            iwh: String 
        ):[String]
        #获取单据表头信息
        getVouchInfo( code: String ): VouchInfo
        #添加单据表体项
        addVouchItem( 
            code: String 
            cat: String 
            model: String 
            color: String 
            qty: Int 
            price: Float 
        ): String
        #删除单据子项
        deleteVouchItem( id: Int ): String
        #更新单据子项
        updateVouchItem(
            id: Int 
            cat: String 
            model: String 
            color: String 
            qty: Int 
            price: Float
        ):String
        #获取单据表体信息
        getVouchItems( code: String ): [ VouchItem ]
    }

    #schema
    schema{
        query: Query
    }
`;

export default makeExecutableSchema({
	typeDefs: schema,
	resolvers: {
		Query: { ...vouchQuery }
	}
});
