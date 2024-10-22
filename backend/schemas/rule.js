import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
    ruleString: {
        type: String,
        required: true
    },
    ast: {
        type: Object,
        required: true
        // default:{asta:"kdfj"}
    },
    metadata: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            default: ''
        }
    }
});

// Middleware to update the updatedAt field before saving
ruleSchema.pre('save', function(next) {
    this.metadata.updatedAt = Date.now();
    next();
});

export default mongoose.model("Rule", ruleSchema);
